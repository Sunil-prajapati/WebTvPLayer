import Dexie from "dexie";

export const db = new Dexie("iptvBlinkPlayer");
db.version(1).stores({
  m3uUsers: "++id, name, m3uLink,allM3uData",
});
export const { m3uUsers } = db;

export const checkUser = async (m3uUserName) => {
  return await m3uUsers.get({
    name: m3uUserName,
  });
};

export const addUser = async (userPayload) => {
  return await m3uUsers.add(userPayload);
};
