import axios from "axios";
import React, { useEffect, useState } from "react";
import "./dashboard.css";

export const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminrole, setAdminrole] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/allusers/`);
      setUser(res.data);
    };
    fetchUser();
  }, []);
  const handleupdate = async (userid, res) => {
    const data = {
      isAdmin: adminrole,
    };
    try {
      const updateddata = await axios.put("/users/" + userid, data);
      res.status(200).json(updateddata);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const handledelete = async (userid, res) => {
    try {
      await axios.delete("/users/" + userid);
      window.location.reload();
      res.status(200).json("Deleted");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="searchinputdashboard container my-3">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Search..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="container">
        <table className="table table-dark">
          <thead>
            <tr className="dashboardrows">
              {/* <th scope="col">#</th> */}
              <th scope="col">Sr no.</th>
              <th scope="col">First</th>
              <th scope="col">Role</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {user
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.username
                    .toLowerCase()
                    .includes(searchTerm.toLocaleLowerCase())
                ) {
                  return val;
                } else {
                  return false;
                }
              })
              .map((usersinfo, i) => (
                <tr className="dashboardrows">
                  {/* <th scope="row">1</th> */}
                  <td>{i + 1}</td>
                  <td>{usersinfo.username}</td>
                  <td>
                    <select
                      name="roles"
                      id="roles"
                      onChange={(e) => setAdminrole(e.target.value)}
                      className="customselect"
                    >
                      {usersinfo.isAdmin === true ? (
                        <option value="true">Admin</option>
                      ) : (
                        <option value="false">User</option>
                      )}
                      {usersinfo.isAdmin === true ? (
                        <option value="false">User</option>
                      ) : (
                        <option value="true">Admin</option>
                      )}
                    </select>
                  </td>
                  <td className="buttons">
                    <button
                      className="btns"
                      type="submit"
                      onClick={() => handleupdate(usersinfo._id)}
                    >
                      Update
                    </button>
                    <button
                      className="btns"
                      type="submit"
                      onClick={() => handledelete(usersinfo._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
