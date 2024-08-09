import React, { useEffect, useState } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import useAuth from '../hooks/useAuth';

const x = 0;

const StaffListForParents = () => {
  const toolbarOptions = ['Search'];

  const { auth } = useAuth();
  const [parentList, setParent] = useState([]);
  const [hasParent, checkParent] = useState([]);
  const [ownersemail, checkEmail] = useState();
  const editing = { allowDeleting: true, allowEditing: true };
  const [user, setUser] = useState({
    staffemail: auth[0],
    email: '',
    parent: '',
  });
  const handleChange = (e) => {
    if (parentList != []) {
      axios.post('http://localhost:9002/getstaff', user).then((res) => {
        checkEmail(res.data.message);
      }).catch((error) => console.log(error));

      user.email = ownersemail;
      axios.post('http://localhost:9002/parentcheck', user).then((res) => {
        checkParent(res.data);
      }).catch((error) => console.log(error));

      user.parent = hasParent;
      if (hasParent.length > 0) {
        axios.post('http://localhost:9002/parentlist', user).then((res) => {
          setParent(res.data.message);
        }).catch((error) => console.log(error));
      }
    }
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl bg-[url('https://storage.googleapis.com/msgsndr/Uj1D6UrVHJKU7MfjEQdt/media/641a98261639e0117f805f35.png')] bg-cover  bg-center">
      <div className="mt-6">
        <button type="button" className="w-half px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={handleChange}>
          Show List of Parents
        </button>
      </div>
      <Header  title="Parents" />
      <GridComponent
        dataSource={parentList}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >

        <Inject services={[Search, Page]} />

      </GridComponent>
    </div>
  );
};
export default StaffListForParents;
