# Travis River Jones Scholarship Foundation

*Built using React.js, Next.js, Firebase, Javascript, and Tailwind CSS.*

[Live Website](https://trjfoundation.vercel.app/)

- Displays information about the foundation.
- Allows applicants to submit applications for scholarships.
- View past recipients of scholarships.

### Firebase
- Scholarship, recipient, and email list data is all stored in Firestore database.
- Recipient images are stored in firebase storage.
- Google OAuth is used to access admin pages.

### Admin pages
*Secured by Google OAuth.*

Admins are able to
- add new scholarships and delete existing ones.
- see applications for each scholarship.
- add new recipients and delete existing ones.
