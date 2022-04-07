import axios from "axios";
import "./certificates.css";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Certificates = ({ Certificates }) => {
  const { user: currentUser } = useContext(AuthContext);
  // const [title, setTitle] = useState();
  // const [date, setDate] = useState();
  // const [url, setUrl] = useState();
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/certificates/${Certificates._id}`, {
        data: { userId: Certificates.userId },
      });
      window.location.reload("/profile");
    } catch (err) {}
  };
  // const handleUpdate = async()=>{
  //   const data = {
  //     userId: Certificates.userId,
  //     title: title,
  //     date: date,
  //     url: url
  //   }
  // }
  return (
    <>
      <div>
        <ul className="certificate">
          <li className="certificates">
            <h4>{Certificates.title}</h4>
            {currentUser._id === Certificates.userId && (
              <div className="deleteicon">
                <i class="far fa-trash-alt" onClick={handleDelete}></i>
              </div>
            )}
          </li>
          <small>Issued ({Certificates.date})</small>
          <br />
          <a href={Certificates.url}>See Credentials</a>
        </ul>
      </div>
      {/* <div
        class="modal fade"
        id="updatecertificate"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered certificatedialog" role="document">
          <div className="modal-content certificatecontent">
            <div className="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Certificate
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form action="" onSubmit={handleUpdate}>
            <div className="modal-body">
              <div className="container createcertificate">
                <label htmlFor="title">Name*</label>
                <input type="text" required placeholder="Certificate Name" defaultValue={Certificates.title} onChange={(e)=>{setTitle(e.target.value)}}/>
                <label htmlFor="date">Issue Date*</label>
                <input type="text" required placeholder="(Month-Year)" defaultValue={Certificates.date} onChange={(e)=>setDate(e.target.value)} />
                <label htmlFor="url">Certificate Url</label>
                <input type="url" placeholder="Url" defaultValue={Certificates.url} onChange={(e)=>setUrl(e.target.value)}/>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary" >
                Create
              </button>
            </div>
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
};
