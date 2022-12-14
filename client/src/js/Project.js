import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Project.scss";
import axios from "axios";
import YouTube from "react-youtube";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Project() {
  const sessionCheckJson = {
    token: sessionStorage.getItem("login-token"),
    name: sessionStorage.getItem("login-name")
  };
  const navigate = useNavigate();

  async function session_check_api(sessionCheckJson) {
    try {
      const response = await axios.post(
        "/api/session-check",
        JSON.stringify(sessionCheckJson),
        {
          headers: {
            "Content-Type": `application/json`
          }
        }
      );

      if (response["data"]["session"] === "deactive") {
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    session_check_api(sessionCheckJson);
  }, []);

  //-----------세션 체크 완료------------------

  const loginCheckJson = {
    token: sessionStorage.getItem("login-token"),
    name: sessionStorage.getItem("login-name")
  };

  const project = useRef("");
  const click = useRef(false);
  const [like, setLike] = useState(0);
  async function project_info_api(projectInfoReqJson) {
    try {
      const response = await axios.post(
        "/api/project-info",
        JSON.stringify(projectInfoReqJson),
        {
          headers: {
            "Content-Type": `application/json`
          }
        }
      );
      const data = response.data;
      project.current = {
        class_name: data.class_name,
        team_number: data.team_number,
        team_name: data.team_name,

        project_name: data.project_name,
        team_member: data.team_member,

        project_pdf_url: data.project_pdf_url,
        project_youtube_url: data.project_youtube_url.slice(-11),

        hashtag_main: data.hashtag_main,
        hashtag_custom_a: data.hashtag_custom_a,
        hashtag_custom_b: data.hashtag_custom_b,
        hashtag_custom_c: data.hashtag_custom_c,

        like_cnt: data.like_cnt
      };
      setLike(project.current.like_cnt);
    } catch (e) {
      console.log(e);
    }
  }
  async function handleOnclick(loginCheckreqJson) {
    try {
      const response = await axios.post(
        `/api/project/${project_id}/like`,
        JSON.stringify(loginCheckreqJson),
        {
          headers: {
            "Content-Type": `application/json`
          }
        }
      );

      if (response["data"]["likeinfo"] === "session-out") {
        navigate("/");
      } else {
        const likeInfo = response.data.likeinfo[0];
        click.current = likeInfo.like_button;
        project.current.like_cnt = likeInfo.like_cnt;
        setLike(likeInfo.like_cnt);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const project_id = useParams().projectId;
  useEffect(() => {
    project_info_api({ project_id });
  }, [project_id]);

  var youtube_w = 700;
  var youtube_h = 350;
  if (window.matchMedia("(max-width:768px)").matches) {
    youtube_w = window.innerWidth * 0.8;
    youtube_h = youtube_w * 0.7;
  }
  return (
    <div className="Project">
      <div className="ProjectInfo">
        <h2>{project.current.project_name}</h2>
        <p id="ProjectMember">{project.current.team_member}</p>
        <div className="ProjectInfoWrapper">
          <button
            id="ProjectLike"
            onClick={() => {
              handleOnclick(loginCheckJson);
            }}
            className={`${click.current ? "" : "NoneClick"}`}
          >
            <div>
              <span className="material-symbols-outlined">favorite</span>
              <p>{like}</p>
            </div>
          </button>
          <p id="ProjectHashtag">
            <span>#{project.current.hashtag_main}</span>
            {project.current.hashtag_custom_a !== "-" ? (
              <span>#{project.current.hashtag_custom_a}</span>
            ) : (
              ""
            )}
            {project.current.hashtag_custom_b !== "-" ? (
              <span>#{project.current.hashtag_custom_b}</span>
            ) : (
              ""
            )}
            {project.current.hashtag_custom_c !== "-" ? (
              <span>#{project.current.hashtag_custom_c}</span>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
      <div className="ProjectContentWrapper">
        <div className="ProjectContent" id="ProjectYoutube">
          <p>YouTube</p>
          {project.current.project_youtube_url ? (
            <YouTube
              className="ProjectYoutube"
              videoId={project.current.project_youtube_url}
              opts={{
                width: youtube_w,
                height: youtube_h,
                playerVars: { autoPlay: 1, rel: 0, modestbranding: 1, start: 1 }
              }}
              onEnd={(e) => {
                e.target.stopVideo(0);
              }}
            />
          ) : (
            <embed
              className="ProjectPDF"
              src={project.current.project_pdf_url}
              type="application/pdf"
            />
          )}
        </div>
        <div className="ProjectContent" id="ProjectPDF">
          <p>PDF</p>
          <span>* 이 PDF는 데스크탑에서 보기를 권장합니다.</span>
          <br></br>
          <embed
            className="ProjectPDF"
            src={project.current.project_pdf_url}
            type="application/pdf"
          />
        </div>
      </div>
    </div>
  );
}

export default Project;
