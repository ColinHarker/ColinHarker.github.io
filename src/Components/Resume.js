import React, { Component } from "react";

class Resume extends Component {
  render() {
    if (this.props.data) {
      var javapic = this.props.data.javapic;
      var skillmessage = this.props.data.skillmessage;
      var education = this.props.data.education.map(function (education) {
        return (
          <div key={education.school}>
            <h3>{education.school}</h3>
            <p className="info">
              {education.degree} <span>&bull;</span>
              <em className="date">{education.graduated}</em>
            </p>
            <p>{education.description}</p>
          </div>
        );
      });
      var work = this.props.data.work.map(function (work) {
        return (
          <div key={work.company}>
            <h3>{work.company}</h3>
            <p className="info">
              {work.title}
              <span>&bull;</span> <em className="date">{work.years}</em>
            </p>
            <p>{work.description}</p>
          </div>
        );
      });
      var skills = this.props.data.skills.map(function (skills) {
        var className = "bar-expand " + skills.name.toLowerCase();
        return (
          <li key={skills.name}>
            <span style={{ width: skills.level }} className={className}></span>
            <em>{skills.name}</em>
          </li>
        );
      });
    }

    return (
      <section id="resume">
        <div className="row education">
          <div className="three columns header-col">
            <h1>
              <span>Education</span>
            </h1>
          </div>

          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">{education}</div>
            </div>
          </div>
        </div>

        <div className="row work">
          <div className="three columns header-col">
            <h1>
              <span>Work</span>
            </h1>
          </div>

          <div className="nine columns main-col">{work}</div>
        </div>

        <div className="row skill">
          <div className="three columns header-col">
            <h1>
              <span>Skills</span>
            </h1>
          </div>

          <div className="nine columns main-col">


            <div class="parent-wrapper">
              <div class="parent">
                <div class="child">
                  <ul>
                    <li>Java</li>
                    <li>
                      <img src="javapic.svg"></img>
                    </li>
                  </ul>
                </div>

                <div class="child">
                  <ul>
                    <li>C</li>
                    <li className="logosize">
                      <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                        <g>
                          <path d="m255.987,85.672c-0.002,-4.843 -1.037,-9.122 -3.129,-12.794c-2.055,-3.612 -5.134,-6.638 -9.262,-9.032c-34.081,-19.67 -68.195,-39.28 -102.264,-58.97c-9.185,-5.307 -18.091,-5.114 -27.208,0.27c-13.565,8.008 -81.481,46.956 -101.719,58.689c-8.334,4.83 -12.39,12.221 -12.392,21.828c-0.013,39.558 0,79.114 -0.013,118.673c0.002,4.736 0.993,8.932 2.993,12.55c2.056,3.72 5.177,6.83 9.401,9.278c20.239,11.733 88.164,50.678 101.726,58.688c9.121,5.387 18.027,5.579 27.215,0.27c34.07,-19.691 68.186,-39.3 102.272,-58.97c4.224,-2.447 7.345,-5.559 9.401,-9.276c1.997,-3.618 2.99,-7.814 2.992,-12.551c0,0 0,-79.094 -0.013,-118.653" fill="#000" id="svg_1" />
                          <path d="m141.101,5.134c-9.17,-5.294 -18.061,-5.101 -27.163,0.269c-13.543,7.987 -81.348,46.834 -101.553,58.537c-8.321,4.817 -12.37,12.189 -12.372,21.771c-0.013,39.455 0,78.909 -0.013,118.365c0.002,4.724 0.991,8.909 2.988,12.517c2.053,3.711 5.169,6.813 9.386,9.254a9008.51,9008.51 0 0 0 20.159,11.62l187.092,-187.092c-26.178,-15.074 -52.363,-30.136 -78.524,-45.241" fill="#000" id="svg_2" />
                          <path d="m152.456,126.968l39.839,0.281c0,-16.599 -16.802,-57.249 -64.973,-57.249c-30.691,0 -71.951,19.512 -71.951,75.61c0,56.097 40.447,74.39 71.951,74.39c51.017,0 63.21,-35.302 63.21,-55.252l-38.007,-2.173s1.017,23.075 -25.406,23.075c-24.39,0 -28.46,-29.878 -28.46,-40.04c0,-15.447 5.493,-40.244 28.46,-40.244c22.968,0 25.337,21.602 25.337,21.602" fill="#FFF" id="svg_3" />
                        </g>
                      </svg>
                    </li>
                  </ul>
                </div>

                <div class="child">
                  <ul>
                    <li>C++</li>
                    <li>
                      <img src="c++logo.svg"></img>
                    </li>
                  </ul>
                </div>

                <div class="child">
                  <ul>
                    <li>Javascript</li>
                    <li>
                      <img src="jslogo.svg"></img>
                    </li>
                  </ul>
                </div>

                <div class="child">
                  <ul>
                    <li>Git</li>
                    <li>
                      <img src="gitlogo.svg"></img>
                    </li>
                  </ul>
                </div>

                <div class="child">
                  <ul>
                    <li>Python</li>
                    <li>
                      <img src="pythonlogo.svg"></img>
                    </li>
                  </ul>
                </div>

                <div class="child">
                  <ul>
                    <li>React</li>
                    <li>
                      <img src="reactlogo.svg"></img>
                    </li>
                  </ul>
                </div>

                <div class="child">
                  <ul>
                    <li>Ionic</li>
                    <li>
                      <img src="ioniclogo.svg"></img>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section >
    );
  }
}

export default Resume;
