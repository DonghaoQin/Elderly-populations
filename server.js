import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import multer from 'multer';
import fs from 'fs';

const app = express();
const port = 3000;




sgMail.setApiKey('');  

app.use(cors());
app.use(express.json());


const upload = multer({ dest: 'uploads/' });


app.post('/send-email', upload.single('attachment'), async (req, res) => {
  console.log('Received email send request:', req.body);

  const { to, subject, text } = req.body;
  const attachmentPath = req.file ? req.file.path : null;

  const msg = {
    to,
    from: 'dillion0504@gmail.com',  
    subject,
    text,
    attachments: attachmentPath
      ? [
          {
            content: fs.readFileSync(attachmentPath).toString('base64'),
            filename: req.file.originalname,
            type: req.file.mimetype,
            disposition: 'attachment',
          },
        ]
      : [],
  };

  try {
    console.log('Sending email to:', to);
    await sgMail.send(msg);
    console.log('Email sent successfully');
    if (attachmentPath) {
      fs.unlinkSync(attachmentPath);  
    }
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.body : error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
