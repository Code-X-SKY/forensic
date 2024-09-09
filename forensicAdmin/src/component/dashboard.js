import React, { useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Header from '../directives/header'
import Footer from '../directives/footer'
import Sidebar from '../directives/sidebar'
import { getDashboardStatisticsAction, getSubCategoryListAction, getUsersListAction } from '../Action/action';

const Dashboard = () => {
  const [subCategoryList, setsubCategoryList] = useState([]);
  const [usersList, setusersList] = useState({});

  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalcategory: 0,
    totalitems: 0,
  });

  useEffect(() => {
    getDashboardStatistics();
    getSubCategoryList()
    getUsersList();
  }, []);


  const getUsersList = async () => {

    let res = await getUsersListAction();

    if (res.status) {
      setusersList(res.Data)
    }
  }


  const getSubCategoryList = async () => {
    let res = await getSubCategoryListAction();
    if (res.success) {
      setsubCategoryList(res.data);
    }
  };

  const getDashboardStatistics = async () => {
    let res = await getDashboardStatisticsAction();
    if (res.success) {
      let phase = [];
      let data = res.data[0];
      setStatistics((old) => {
        return {
          ...old,
          'totalUsers': data.totalUsers,
          'totalcategory': data.totalcategory,
          'totalitems': data.totalitems,
          'totalattributes': data.totalattributes,
          'totaltransactions': data.totaltransactions,
          'totalalert_request': data.totalalert_request,
          'totalnotification': data.totalnotification,
          'totalassistance_request': data.totalassistance_request


        }
      })
    }
  }

  return (

    <>
      <div class="wrapper">
        {/* <div id="loader"></div> */}
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-full">
            <div className='filterone'></div>
            <div className='filtertwo'></div>
            <div className='circlebox1'>
              <img src='images/circleshape.png' alt='circleshape' className='' />
            </div>
            <div className='circlebox2'>
            <img src='images/circleshape.png' alt='circleshape' className='' />
            </div>
            <div className="content-header">
              <div className="d-flex align-items-center">
                <div className="me-auto">
                  <h3 className="page-title mb-5 pb-2">Dashboard</h3>

                </div>
              </div>

            </div>
            {/* Content Header (Page header) */}
            {/* Main content */}
            <section className="content pt-0">
              <div className="row">
                <div className="col-xl-12 col-12">
                  <div className="row">
                    <div className="col-lg-4 col-12">
                      <div className="box">
                        <div className="box-body">
                          <div className="no-line-chart d-flex align-items-end justify-content-between">
                            <div>
                              <p className="mb-0"><h4>Total Customers</h4></p>
                              <p className="mb-0">
                                <h5>{usersList.length}</h5>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-12">
                      <div className="box">
                        <div className="box-body">
                          <div className="no-line-chart d-flex align-items-end justify-content-between">
                            <div>
                              <p className="mb-0"><h4>Total Category</h4></p>
                              <p className="mb-0">
                                <h5>{statistics.totalcategory}</h5>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-12">
                      <div className="box">
                        <div className="box-body">
                          <div className="no-line-chart d-flex align-items-end justify-content-between">
                            <div>
                              <p className="mb-0"><h4>Total Sub Categories</h4></p>
                              <p className="mb-0">
                                <h5>{subCategoryList.length}</h5>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-12">
                      <div className="box">
                        <div className="box-body">
                          <div className="no-line-chart d-flex align-items-end justify-content-between">
                            <div>
                              <p className="mb-0"><h4>Total Item</h4></p>
                              <p className="mb-0">
                                <h5>{statistics.totalitems}</h5>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>



                </div>


              </div>
            </section>
            {/* /.content */}
          </div>
        </div>

        <Footer />
      </div>
    </>


  )

}
export default Dashboard;