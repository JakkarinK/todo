# React + Vite

Project Use:

- ReactJS + Vite #Framework
- Material UI[icons-material, x-date-pickers] #Framework
- SCSS #CSS Framework
- Localstorage #Database
- dayjs #Format date
- uuid # generate TODO \_ID
- gh-pages # Deploy projects

  This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Functions:

- Add Task -> ต้องกรอกข้อมูลให้ครบทุกช่องถึงจะสามารถเพิ่มTaskได้
- Edit Task -> แก้ไขTaskที่ต้องการจะแก้ไขและต้องมีข้อมูลครบทุกช่อง
- Delete Task -> จะมีModalขึ้นมาเพิ่มให้ทำการยืนยันว่าจะลบTaskหรือไม่
- Show Task-Lists -> แสดงTaskทั้งหมดที่อยู่ในLocalstorage
- Toggle Task -> ทำเครื่องหมายว่าTaskนั้นๆเสร็จสิ้นและเมื่อเสร็จสิ้นจะขีดเส้นทับTitleของTaskนั้น
- Task non-completed Total -> แสดงจำนวนTaskที่ยังไม่เสร็จสิ้น

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
