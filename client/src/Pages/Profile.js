import { useEffect, useState } from "react";
import ProfileSection from "../components/Profile/ProfileSection";
import Wishlist from "../components/Profile/Wishlist/Wishlist";
import ActiveSells from "../components/Profile/Sells/ActiveSells";
import ArchivedSells from "../components/Profile/Sells/ArchivedSells";
import SellerProfile from "../components/Profile/SellerProfile";
import { getUserById } from "../services/userData";

import "../components/Profile/Profile.css";

function Profile({ match, history }) {
  const [active, setActive] = useState(true);
  const [archived, setArchived] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [user, setUser] = useState([]);

  // const [showMsg, setShowMdg] = useState(false);
  // const handleClose = () => setShowMdg(false);
  // const handleShow = () => setShowMdg(true);

  const handleActive = () => {
    setActive(true);
    setArchived(false);
    setWishlist(false);
  };

  const handleArchived = () => {
    setActive(false);
    setArchived(true);
    setWishlist(false);
  };

  const handleWish = () => {
    setActive(false);
    setArchived(false);
    setWishlist(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserById(match.params.id)
      .then((res) => {
        setUser(res.user);
        console.log(res.user);
      })
      .catch((err) => console.log(err));
  }, [match.params.id]);

  return (
    <>
      {localStorage.userData ? (
        <>
          <ProfileSection params={user} />
          <div className="profile_wrapper">
            <div className="seller_list_menu">
              <button onClick={handleActive}>Ակտիվ</button>{" "}
              <button onClick={handleArchived}>Արխիվացված</button>{" "}
              <button onClick={handleWish}>Նախնտրած</button>{" "}
            </div>
            <div className="profile_active_sales">
              {active && <ActiveSells params={user} />}
              {archived && <ArchivedSells history={history} />}
              {wishlist && <Wishlist />}
            </div>
          </div>
        </>
      ) : (
        <SellerProfile params={user} history={history} />
      )}
    </>
  );
}

export default Profile;
