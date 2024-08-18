import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const sendEmail = async (req: Request, res: Response) => {
  try {
    const { email, date, name } = req.body;

    // Create a transporter using Gmail service
    const transporter = nodemailer.createTransport({
      service: "gmail", // Gmail service
      host: "smtp.gmail.com",
      port: 587, // Port for TLS
      secure: false, // Use TLS
      auth: {
        user: process.env.GMAIL_USER, // Use environment variable
        pass: process.env.GMAIL_PASS, // Use environment variable
      },
    });

    console.log("Transporter created:", transporter);

    // Define email options
    const mailOptions = {
      from: `"SMPI Karya Mukti" <${process.env.GMAIL_USER}>`, // Sender address
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
