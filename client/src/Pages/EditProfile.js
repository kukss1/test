import { useEffect, useState } from 'react';
import ActiveSells from '../components/Profile/Sells/ActiveSells';
import { getUser, editUserProfile } from '../services/userData';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import { AiFillCloseSquare } from 'react-icons/ai'

function EditProfile({ history }) {
    const [user, setUser] = useState({ name: "", phoneNumber: "", email: "", avatar: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [alertShow, setAlertShow] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        getUser()
            .then(res => setUser(res.user))
            .catch(err => console.log(err))
    }, [setUser])

    const handleDiscard = () => { history.push(`/profile/${user._id}`) }
    const handleChanges = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
        if (e.target.files) {
            setUser({ ...user, avatar: e.target.files[0] })
        }
    }

    const handleSave = (e) => {
        //TODO: Rewrite this 
        e.preventDefault();
        let { _id, name, phoneNumber, email, avatar } = user;
        let obj = { name, phoneNumber, email }
        setLoading(true);
        if (typeof avatar == 'object') {
            getBase64(avatar)
                .then((data) => {
                    obj['avatar'] = data;
                    editUserProfile(_id, obj)
                        .then(res => {
                            if (!res.error) {
                                history.push(`/profile/${_id}`);
                            } else {
                                setLoading(false);
                                setError(res.error);
                                setAlertShow(true);
                            }
                        })
                        .catch(err => console.error('edit profile err: ', err))
                })
                .catch(err => console.log('base64 error: ', err));
        } else {
            editUserProfile(_id, obj)
                .then(res => {
                    if (!res.error) {
                        history.push(`/profile/${_id}`);
                    } else {
                        setLoading(false);
                        setError(res.error);
                        setAlertShow(true);
                    }
                })
                .catch(err => console.error('edit profile err: ', err))
        }
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    return (
        <>
            <div id="profile-head">
                <div className="edit_profile_wrapper">
                    <form className="edit_profile_form">
                        {alertShow &&
                            <div variant="danger" onClose={() => setAlertShow(false)} dismissible>
                                <p>
                                    {error}
                                </p>
                            </div>
                        }
                        <div className="profile-row">
                            <div>
                                <label htmlFor="file-upload" className="custom-file-upload">
                                        <img className="edit_profile_avatar" src={user.avatar} alt="user-avatar"/>
                                   
                                </label>
                                <input id="file-upload" type="file" name="avatar" onChangeCapture={handleChanges} />
                            </div>
                            <div className='edit_profile_input'>
                                <p><BsFillPersonFill /> <input className='edit_input' type="text" name="name" value={user.name} onChange={handleChanges} required /></p>
                                <p><MdEmail /> <input className='edit_input' type="email" name="email" value={user.email} onChange={handleChanges} required /></p>
                                <p><MdPhoneAndroid /> <input className='edit_input' type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChanges} required /></p>
                            </div>
                            <div>
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                        <div className='edit_input_btn'>
                                            <span title='Save changes'></span>
                                                
                                            
                                                <span onClick={handleSave}><TiTick /></span>
                                            
                                            <span title='Discard changes'></span>
                                            
                                            
                                                <span onClick={handleDiscard}><AiFillCloseSquare /></span>
                                            
                                        </div>
                                    )}

                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container">
                <div>
                    <div lg={2} sm={12} id="aside">
                        <button disabled  id="active-sells">Ակտիվ</button>{' '}
                        <button disabled  id="archived-sells">Արխիվացված</button>{' '}
                        <button disabled  id="wishlist">Նախնտրած</button>{' '}
                    </div>
                    <div lg={10} sm={12} disabled>
                        <ActiveSells params={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile;