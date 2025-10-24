import './profilePage.css';

function ProfilePage() {
  const { id } = useParams();
  const user = getUserById(Number(id));

  if (!user) return <p>Korisnik nije pronadjen.</p>;

  return (
    <div className="profile-page">
      <h1>ProfilePage</h1>
    </div>
  );
}

export default ProfilePage;
