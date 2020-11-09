import React, { Fragment, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "./TimelineHistory.css";
import PersonIcon from "@material-ui/icons/Person";
import PersonalVideoIcon from "@material-ui/icons/PersonalVideo";
import callServer from "../../services/callServer";
import { extractId } from "../../services/Utils";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import CommentIcon from "@material-ui/icons/Comment";
import TimelineHistoryModal from "./TimelineHistoryModal";
import { useTranslation } from "react-i18next";
import Tooltip from "@material-ui/core/Tooltip";
import { formatDateToDisplay } from "../../services/Utils";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { getUserId } from "../../services/StorageManager";

const TimelineHistory = ({ data, onAddMessage }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const fabStyle = {
    position: "absolute",
    margin: 0,
    top: "auto",
    left: "auto",
    right: useMediaQuery(theme.breakpoints.down("sm")) ? 35 : 40,
    bottom: useMediaQuery(theme.breakpoints.down("sm")) ? 65 : 75,
    zIndex: "1000000",
  };

  const addMessage = (text) => {
    const message = {
      id: null,
      message: text,
      date: new Date(),
      isSystem: 2,
      user: {
        id: getUserId(),
      },
    };

    callServer.post(`/histories`, message).then((response) => {
      const newId = extractId(response.headers.location);
      onAddMessage(newId);
      setIsOpen(false);
    });
  };

  return (
    <Fragment>
      <Tooltip title={t("add")} aria-label="add" placement="left">
        <Fab
          style={fabStyle}
          color="secondary"
          size="large"
          component="span"
          aria-label="add"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <CommentIcon />
        </Fab>
      </Tooltip>

      {isOpen && (
        <TimelineHistoryModal
          onSave={addMessage}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}

      <VerticalTimeline>
        {data.map((history, index) => {
          const clazz = history.isSystem === 1 ? "system" : "user";

          return (
            <VerticalTimelineElement
              key={index}
              className={`vertical-timeline-element-${clazz}`}
              iconClassName={`icon-${clazz}`}
              icon={
                history.isSystem === 1 ? <PersonalVideoIcon /> : <PersonIcon />
              }
            >
              <h3 className="vertical-timeline-element-title">
                {history.user?.name}
              </h3>
              {history.isSystem === 1 && (
                <h4 className="vertical-timeline-element-subtitle">
                  {t("on") +
                    " " +
                    formatDateToDisplay(new Date(history.date), true) +
                    " " +
                    t(history.message)}
                </h4>
              )}
              {history.isSystem === 2 && (
                <Fragment>
                  <h4 className="vertical-timeline-element-subtitle">
                    {t("on") +
                      " " +
                      formatDateToDisplay(new Date(history.date), true) +
                      " " +
                      t("wrote") +
                      ":"}
                  </h4>
                  <p>{history.message}</p>
                </Fragment>
              )}
            </VerticalTimelineElement>
          );
        })}
        <VerticalTimelineElement
          iconStyle={{
            background: "#1976d2",
            color: "#fff",
          }}
          icon={<PlayArrowIcon />}
        />
      </VerticalTimeline>
    </Fragment>
  );
};

export default TimelineHistory;
