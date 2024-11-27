export const fetchRolesApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
        { id: 2, name: "Editor", permissions: ["Read", "Write"] },
        { id: 3, name: "Viewer", permissions: ["Read"] },
      ]);
    }, 1000);
  });
};
