const verfiyEmailTemplate = ({ name, url }) => {
  return `
    <p>Dear ${name}</p>
    <p>Thank you for registering Bliinkit.</p>
    <a herf=${url} style="color:black; background: orange; margin-top: 10px; padding:20px,display:block">
    Verify Email
    </a>
    
    `;
};

export default verfiyEmailTemplate;
