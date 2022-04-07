import React from "react";
import "./resume.css";

console.log(window.location.pathname)
export const Resume = () => {
  return (
    <div>
      <div className="resumepage" id="resume">
        <div className="resumes">
          <div className="resumeheader">
            <div className="leftheader">
              <h2>Your Name</h2>
              <small>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit
              </small>
            </div>
            <div className="rightheader">
              <p>
                123 Your Street Your City, ST 12345
                <br />
                (123) 456-7890 <br />
                no_reply@example.com
              </p>
            </div>
          </div>
          <div className="resumebody">
            <div className="leftbody">
              <div className="resumeexp">
                <h6>EXPERIENCE</h6>
                <div className="exp1">
                  <h6>Company, Location-Job Title</h6>
                  <p>
                    PRESENT <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aliquid, voluptas!
                  </p>
                </div>
                {/* <div className="exp1 my-4">
                            <h6>Kode IT solutions - (Full Stack Intern)</h6>
                            <p>PRESENT <br />Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, voluptas!</p>
                        </div>
                        <div className="exp1 my-4">
                            <h6>Kode IT solutions - (Full Stack Intern)</h6>
                            <p>PRESENT <br />Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, voluptas!</p>
                        </div> */}
              </div>
              <div className="resumeeducation my-5">
                <h6>EDUCATION</h6>
                <div className="exp1">
                  <h6>School Name</h6>
                  <p>
                    MONTH 20XX-MONTH 20XX <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aliquid, voluptas!
                  </p>
                </div>
                <div className="exp1 my-4">
                  <h6>School Name</h6>
                  <p>
                    MONTH 20XX-MONTH 20XX <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aliquid, voluptas!
                  </p>
                </div>
              </div>
              <div className="resumeprojects my-5">
                <h6>PROJECTS</h6>
                <div className="exp1">
                  <h6>Project Name</h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aliquid, voluptas!
                  </p>
                </div>
                <div className="exp1 my-4">
                  <h6>Project Name</h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aliquid, voluptas!
                  </p>
                </div>
              </div>
            </div>
            <div className="rightbody">
              <div className="resumeskilss my-5">
                <h6>SKILLS</h6>
                <div className="exp1">
                  <p>
                    Lorem ipsum dolor sit amet. <br />
                    Consectetuer adipiscing elit <br />
                    Sed diam nonummy nibh euismod tincidunt. <br />
                    L​​​‌​aoreet dolore magna aliquam erat volutp <br />
                  </p>
                </div>
              </div>
              <div className="resumeawards my-5">
                <h6>AWARDS/CERTIFICATIONS</h6>
                <div className="exp1">
                  <p>
                    <b>Lorem ipsum dolor sit</b> Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Sapiente, libero.
                  </p>
                </div>
                <div className="exp1">
                  <p>
                    <b>Lorem ipsum dolor sit</b> Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Sapiente, libero.
                  </p>
                </div>
              </div>
              <div className="resumeawards my-5">
                <h6>LANGUAGES</h6>
                <div className="exp1">
                  <p>Lorem ipsum, Dolor sit amet, Consectetuer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={()=>window.print()}>Print</button> */}
    </div>
  );
};
