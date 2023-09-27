import React, { useEffect, useState, useContext } from "react";
import CloseModalButton from "../util/CloseModalButton";
import {
  useGetStatsQuery,
  useUpdateStudyTimeMutation,
} from "../../slices/statsApi";
import { useDispatch, useSelector } from "react-redux";
import { WallpaperContext } from "../../context/WallpaperContex";

const UserStats = ({ user }) => {
  const { theme } = useContext(WallpaperContext);
  const { data } = useGetStatsQuery(user._id);
  const [updateStudyTime] = useUpdateStudyTimeMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const timerState = useSelector((state) => state.timer);
  const [stats, setStats] = useState(null);

  // const updateTotalStudyTime = async (totalStudyTimeMins) => {
  //   const data = { studyTime: totalStudyTimeMins };
  //   const res = await updateStudyTime({ id: userInfo.user._id, data });
  // };

  // useEffect(() => {
  //   if (userInfo?.user && userInfo.user._id != "guest") {
  //     updateTotalStudyTime(timerState.totalStudyTimeMins);
  //   }
  // }, []);

  // Get User name
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user._id != "guest") {
          const response = await fetch(
            `http://localhost:4000/api/user/${user._id}/stats`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch stats");
          } else {
            const data = await response.json();
            setStats(data[0]);
          }
        }
      } catch (e) {
        // console.log("error", e);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="relative h-[70%] w-[80%] rounded-3xl bg-neutral-50 px-4 py-10 shadow-modal"
      onClick={(event) => event.stopPropagation()}
    >
      <CloseModalButton />
      {stats && (
        <div className="m-4 flex flex-col gap-5 h-full">
          <div
            className="flex w-full flex-col gap-5 items-center justify-center py-5"
            style={{ backgroundColor: theme[1] + "19" }}
          >
            <img
              className="h-40 w-40 rounded-full"
              src={user.profilePicture}
              alt=""
            />
            <div className="text-3xl font-bold">{user.username}</div>
          </div>

          <div className="h-[40%] grid grid-cols-5 gap-10">
            <div className=" flex flex-col gap-2 items-center justify-center bg-[#FAEDCB]">
              <p className="font-bold text-2xl text-center">
                Time Spent Working
              </p>
              <p className="font-bold text-2xl">{stats.studyTime} Minutes</p>
            </div>
            <div className="h-[80%] w-full bg-black">Total Break Time</div>
            <div className="">Sessions Completed</div>
            <div className="">Dailies Completed</div>
            <div className="">Longest Streak</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStats;
