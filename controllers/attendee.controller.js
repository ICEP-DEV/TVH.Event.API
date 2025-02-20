const bcrypt = require("bcrypt");
const db = require("../config/config");
const transporter = require("../config/send_email");

const updateDeviceID = async (req, res) => {
  const { device_id } = req.body;

  console.log(device_id);
};

const getAttendeeByEmail = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  await db
    .execute("SELECT * from attendee where email = ?", [email])
    .then((response) => {
      return res.status(200).json({ results: response[0] });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};

const addEventToFavourites = async (req, res) => {
  const { event_id, attendee_id } = req.body;
  console.log(req.body);
  console.log("Attendee ID: " + attendee_id);
  console.log("Event ID: " + event_id);

  try {
    ///set the event as a favourite
    const [result] = await db.execute(
      "INSERT INTO attendee_favourite_event ( event_id, attendee_id) VALUES ( ?, ?)",
      [ event_id, attendee_id]
    );
    console.log("Added event to favourites successfully");
    return res.status(200).json({ results: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const removeEventFromFavourites = async (req, res) => {
  const { event_id, attendee_id } = req.body;
  console.log(req.body);
  console.log("Attendee ID: " + attendee_id);
  console.log("Event ID: " + event_id);

  try {
    ///set the event as a favourite
    const [result] = await db.execute(
      "DELETE FROM attendee_favourite_event WHERE event_id = ? AND attendee_id = ?",
      [ event_id, attendee_id]
    );
    console.log("Removed event from favourites successfully");
    return res.status(200).json({ results: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getFavoriteEvents = async (req, res) => {
  const { attendee_id } = req.params;

  await db
    .execute(
      "SELECT e.* from event e " +
        "JOIN attendee_favourite_event afe on afe.event_id = e.event_id " +
        "WHERE afe.attendee_id = ?",
      [attendee_id]
    )
    .then((response) => {
      if( response[0].length === 0){
        //Return false if no favourite events are found
        return res.status(200).json({ results: false });  
      }else{
        //Return the favourite events
        return res.status(200).json({ results: response[0] });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: error.message });
    });
};

const isFavourite = async (req, res) => {
  const { event_id, attendee_id } = req.body;

  await db
    .execute("SELECT * from attendee_favourite_event where event_id = ? and attendee_id = ?", [event_id, attendee_id])
    .then((response) => {
      if (response[0].length > 0) {
        return res.status(200).json({ results: true });
      } else {
        return res.status(200).json({ results: false });
      }
    })
};

const sendOtp = async (email, otp) => {
  await transporter
    .sendMail({
      from: "info.events@7stack.co.za",
      to: email,
      subject: "HackTrack Reset Password OTP",
      html:
        "<div><h3>Reset your HackTrack login password</h3><p>Use the following OTP to reset your password <br> <strong>" +
        otp +
        "</strong></p></div>",
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const generateOtp = async (req, res) => {
  const { email } = req.params;
  const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  console.log("Email : " + email);

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await sendOtp(email, otp);
    return res.status(200).json({ otp: otp });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send OTP" });
  }
};

const getAttendeeEvents = async (req, res) => {
  const { attendee_id } = req.params;

  await db
    .execute(
      "SELECT e.* from event e " +
        "JOIN registration_form rf on rf.event_id = e.event_id " +
        "JOIN registration r on r.registration_form_id = rf.registration_form_id " +
        "WHERE r.attendee_id = ?",
      [attendee_id]
    )
    .then((response) => {
      return res.status(200).json({ results: response[0] });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: error.message });
    });
};

const updatePassword = async (req, res) => {
  try {
    const { attendee_id, current_password, new_password } = req.body;

    const current_user = await db.execute(
      "SELECT password from attendee where attendee_id = ?",
      [attendee_id]
    );
    const isValid = await bcrypt.compare(
      current_password,
      current_user[0][0].password
    );

    if (isValid !== true) {
      return res.status(401).json({ results: isValid });
    }

    const encryped_password = await bcrypt.hash(new_password, 10);
    await db
      .execute("UPDATE attendee set password = ? where attendee_id = ?", [
        encryped_password,
        attendee_id,
      ])
      .then((response) => {
        return res.status(200).json({ results: isValid });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, new_password } = req.body;

    const attendee_id = await db.execute(
      "SELECT attendee_id from attendee where email = ?",
      [email]
    );

    const encryped_password = await bcrypt.hash(new_password, 10);
    await db
      .execute("UPDATE attendee set password = ? where attendee_id = ?", [
        encryped_password,
        attendee_id[0][0].attendee_id,
      ])
      .then((response) => {
        return res.status(200).json({ results: "Password successfully reset" });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const signAttendeeRegister = async (req, res) => {
  const { registration_id } = req.body;
  console.log("registration id : " + registration_id);

  await db
    .execute("SELECT successful from registration WHERE registration_id = ?", [
      registration_id,
    ])
    .then((response) => {
      if (response[0].successful === 1) {
        return res.status(200).json({ results: "already signed the register" });
      }
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    });

  await db
    .execute(
      "UPDATE registration SET successful = 1 WHERE registration_id = ? ",
      [registration_id]
    )
    .catch((error) => {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    });

  return res.status(200).json({ results: "Successfully signed register" });
};

const endAttendeeRegister = async (req, res) => {
  const { registration_id } = req.params;

  await db
    .execute("SELECT successful from registration WHERE registration_id = ?", [
      registration_id,
    ])
    .then((response) => {
      if (response[0].successful === 0) {
        return res.status(200).json({ results: "Hasn't signed register yet" });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: error.message });
    });

  await db
    .execute(
      "UPDATE registration SET successful = 0 WHERE registration_id = ? ",
      [registration_id]
    )
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: error.message });
    });

  return res
    .status(200)
    .json({ results: "Successfully removed signature from register" });
};

module.exports = {
  updateDeviceID,
  getAttendeeEvents,
  updatePassword,
  signAttendeeRegister,
  endAttendeeRegister,
  getAttendeeByEmail,
  generateOtp,
  resetPassword,
  addEventToFavourites,
  removeEventFromFavourites,
  getFavoriteEvents,
  isFavourite
};
