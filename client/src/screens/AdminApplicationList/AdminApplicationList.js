import Icon from "../../assets/icons/Icon";
import TableBody from "../../components/Table/TableBody/TableBody";
import TableHeader from "../../components/Table/TableHeader/TableHeader";
import AdminTemplate from "../../layout/AdminTemplate/AdminTemplate";
import styles from "./AdminApplicationList.module.css";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getForms } from "../../services/actions";
import { statusOptions } from "../../constants/applicationStatus";
import { useLoadingContext } from "../../context/Loading";
import {
  PAGE_RANGE_DISPLAYED,
  PER_PAGE_COUNT,
} from "../../constants/pagination";

const AdminApplicationList = () => {
  const { setLoading } = useLoadingContext();

  const [applicationList, setApplicationList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
  };

  const getAllForms = async () => {
    try {
      setLoading(true);
      const res = await getForms(pageNumber, searchText, selectedOption);
      setApplicationList(res.forms);
      setPageCount(Math.ceil(res.count / PER_PAGE_COUNT + 1));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllForms();
  }, [pageNumber, searchText, selectedOption]);

  const tableHeader = [
    "Ad-Soyad",
    "Başvuru Nedeni",
    "Başvuru Durumu",
    "Başvuru Tarihi",
    "Başvuru Numarası",
  ];

  return (
    <AdminTemplate>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.headerTitle}>
            <Icon name="ApplicationList" color="#232637" />
            <p>Başvuru Listesi</p>
          </div>
          <div className={styles.searchContainer}>
            <input
              className={styles.searchInput}
              placeholder="Arama Yap..."
              type="search"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <DropdownMenu
              options={statusOptions}
              selectedOption={selectedOption}
              onSelect={handleSelect}
            />
          </div>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <TableHeader tableHeader={tableHeader} />
            <TableBody tableData={applicationList} />
          </table>
        </div>
        <ReactPaginate
          containerClassName={styles.pagination}
          activeClassName={styles.selected}
          previousClassName={styles.previous}
          disabledClassName={styles.disabled}
          nextClassName={styles.next}
          forcePage={pageNumber - 1}
          breakLabel="..."
          nextLabel="Sonraki >"
          onPageChange={(e) => setPageNumber(e.selected + 1)}
          pageCount={pageCount - 1}
          pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
          previousLabel="< Önceki"
          renderOnZeroPageCount={null}
        />
      </div>
    </AdminTemplate>
  );
};

export default AdminApplicationList;
