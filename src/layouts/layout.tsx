import { useAppDispatch } from "@/lib";
import { Server } from "@/models";
import { Database } from "@/models/server";
import { userInfoSlice } from "@/store/slices";
import { Box } from "@mui/material";
import React, { Suspense } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

export default function Layout() {
  const currentUser = useLoaderData() as Server.Dto.User.GetUserResponse;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(userInfoSlice.actions.setUserInfo(currentUser));
  }, [currentUser, dispatch]);

  return (
    <Box p={2} height={"100%"}>
      <Suspense fallback={<p>loading...</p>}>
        <Outlet />
      </Suspense>
    </Box>
  );
}

Layout.loader = async () => {
  await Database.INIT();
  const result = await Database.FETCH_USER({ id: 6 });
  return result;
};
