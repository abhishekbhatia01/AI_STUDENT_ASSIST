export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};

export const getOtpHtml = (otp) => {
  return `
  <div style="background:#f4f7fb;padding:40px 20px;font-family:Arial,sans-serif;">
    
    <div style="
      max-width:600px;
      margin:0 auto;
      background:#ffffff;
      border-radius:12px;
      overflow:hidden;
      box-shadow:0 4px 12px rgba(0,0,0,0.1);
    ">
      
      <div style="
        background:#2563eb;
        padding:30px;
        text-align:center;
      ">
        <h1 style="margin:0;color:#ffffff;">
          AI Student Assistant
        </h1>
      </div>

      <div style="padding:40px 30px;text-align:center;">
        
        <h2 style="color:#1f2937;margin-bottom:10px;">
          Verify Your Email
        </h2>

        <p style="
          color:#6b7280;
          font-size:16px;
          line-height:1.6;
          margin-bottom:25px;
        ">
          Use the verification code below to complete your account setup.
        </p>

        <div style="
          background:#eff6ff;
          border:2px dashed #2563eb;
          border-radius:10px;
          padding:20px;
          margin:25px 0;
        ">
          <span style="
            font-size:32px;
            font-weight:700;
            letter-spacing:8px;
            color:#2563eb;
          ">
            ${otp}
          </span>
        </div>

        <p style="
          color:#6b7280;
          font-size:14px;
          line-height:1.6;
        ">
          This code is valid for <strong>10 minutes</strong>.
          Do not share this code with anyone.
        </p>

      </div>

      <div style="
        background:#f9fafb;
        border-top:1px solid #e5e7eb;
        padding:20px;
        text-align:center;
      ">
        <p style="
          margin:0;
          font-size:12px;
          color:#9ca3af;
        ">
          If you didn't request this verification, you can safely ignore this email.
        </p>
      </div>

    </div>

  </div>
  `;
};


export const welcomeEmailHtml = (name) => {
  return `
    <div style="background-color:#f4f7fb;padding:40px 20px;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
        
        <div style="background:#4f46e5;padding:30px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;">Welcome 🎉</h1>
        </div>

        <div style="padding:40px 30px;text-align:center;">
          <h2 style="color:#333;margin-bottom:15px;">
            Hi ${name},
          </h2>

          <p style="font-size:16px;line-height:1.6;color:#555;margin-bottom:20px;">
            Thank you for joining us! We're excited to have you as part of our community.
            Your account has been successfully created and you're ready to get started.
          </p>

          <a
            href="#"
            style="
              display:inline-block;
              background:#4f46e5;
              color:#ffffff;
              text-decoration:none;
              padding:12px 24px;
              border-radius:8px;
              font-weight:bold;
              margin:20px 0;
            "
          >
            Get Started
          </a>

          <p style="font-size:14px;color:#666;line-height:1.6;">
            If you have any questions, simply reply to this email or contact our support team.
            We're always happy to help.
          </p>
        </div>

        <div style="background:#f8fafc;padding:20px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="margin:0;font-size:12px;color:#888;">
            © ${new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  `;
};
