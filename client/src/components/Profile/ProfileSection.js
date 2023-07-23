import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md'
import { FaSellsy } from 'react-icons/fa'
import { GrEdit } from 'react-icons/gr';

function ProfileSection({ params }) {
  return (
    <div className="profile_head">
      <div className="seller_profile_wrapper">
        <div className="profile-row">
          <div className="seller_profile_avatar_wrapper">
            <img className="seller_profile_avatar" alt="avatar" src={params.avatar} />
          </div>
          <div className="seller_profile_info">
            <p><BsFillPersonFill /> {params.name}</p>
            <p><MdEmail /> {params.email}</p>
            <p><MdPhoneAndroid /> {params.phoneNumber}</p>
            <p><FaSellsy /> {params.totalSells} sells in total</p>
          </div>
          <span className="edit_profile_icon">
            <Link to={`/profile/${params._id}/edit`}>edit profile<GrEdit /></Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
