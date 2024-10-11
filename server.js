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

  const messages = to.map((recipient) => ({
    to: recipient,
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
  }));

  try {
    console.log('Sending bulk emails to:', to);
    await sgMail.send(messages); // 使用批量发送的功能
    console.log('Emails sent successfully');
    if (attachmentPath) {
      fs.unlinkSync(attachmentPath); // 删除附件
    }
    res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending emails:', error.response ? error.response.body : error);
    res.status(500).json({ error: 'Failed to send emails.' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
