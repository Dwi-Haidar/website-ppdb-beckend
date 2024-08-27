import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const sendEmail = async (req: Request, res: Response) => {
  try {
    const { email, date, name } = req.body;

    // Create a transporter using Gmail service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"SMPI Karya Mukti" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Pemberitahuan Kelulusan dan Pengambilan Seragam",
      text: `
Kepada Yth.
Calon Siswa/i SMPI Karya Mukti

Dengan hormat,
Kami sampaikan selamat kepada Anda yang telah berhasil melakukan pembayaran dan dinyatakan diterima sebagai calon siswa/i baru SMPI Karya Mukti tahun ajaran 2024.

Untuk melengkapi proses administrasi, Anda diharapkan hadir untuk pengambilan seragam pada:
Hari/Tanggal: ${date}
Waktu: 08.00 - 14.00
Tempat: Ruangan Tata Usaha

Harap membawa bukti pembayaran dan kartu identitas saat pengambilan seragam. Jika ada pertanyaan lebih lanjut, Anda dapat menghubungi pihak sekolah melalui kontak yang tersedia.

Terima kasih atas kepercayaan Anda, dan kami tunggu kedatangan Anda.

Hormat kami,
Manajemen SMPI Karya Mukti`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Failed to send email");
      }
      console.log("Email sent:", info.response);
      console.log("Message sent: %s", info.messageId);
      res.status(200).send("Email sent successfully");
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
};
export const sendEmailVerifPembayaranFormulir = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, nama } = req.body;
    const link = "http://localhost:5173/ppdbonline";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"SMPI Karya Mukti" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Pembayaran awal Formulir",
      html: `
        <p>Terimakasih  ${nama},</p>
          <p>Terima kasih telah melakukan pembayaran awal formulir untuk penerimaan siswa/i baru SMPI Karya Mukti.</p>

          <p>Dengan ini kami mengonfirmasi bahwa pembayaran Anda telah diterima. Selanjutnya, Anda diharapkan untuk melakukan langkah berikut:</p>

          <p>Dengan Mengklick tombol dibawah ini</p>
          <p>Terimakasih.</p>

        <p>
          <a href="${link}" style="display: inline-block; padding: 10px 20px; font-size: 16px; font-weight: bold; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Konfirmasi Kehadiran</a>
        </p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Failed to send email");
      }
      console.log("Email sent:", info.response);
      console.log("Message sent: %s", info.messageId);
      res.status(200).send("Email sent successfully");
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
};

export const sendEmailMelakukanPembayaran = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, name } = req.body;
    const link = "http://localhost:5173/pembayaran";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"SMPI Karya Mukti" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Pembayaran PPOB",
      html: `
        <p>Diharapkan  ${name},</p>
          <p>Melakukan Pembayaran PPOB untuk penerimaan siswa/i baru SMPI Karya Mukti.</p>
          <p>Dengan Mengklick tombol dibawah ini</p>

        <p>
          <a href="${link}" style="display: inline-block; padding: 10px 20px; font-size: 16px; font-weight: bold; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Bayar</a>
        </p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Failed to send email");
      }
      console.log("Email sent:", info.response);
      console.log("Message sent: %s", info.messageId);
      res.status(200).send("Email sent successfully");
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
};
