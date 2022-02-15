import React from "react";
import PaginationComponent from "react-reactstrap-pagination";
import {AppContext} from "../../../utility/context";
import hooks from "../hooks";

const DataPagination: React.FC = () => {
    const {state} = React.useContext(AppContext);
    const {handleFilter} = hooks();

    const handleNextPage = (page: number) => {
        handleFilter(page.toString(), state.incident.apiRequestList);
    };

    return (
        <>
            {!state.incident.apiResponseList?.isError && (
                <PaginationComponent
                    totalItems={state.incident.apiResponseList?.response.pagination.total || 0}
                    pageSize={state.incident.apiResponseList?.response.pagination.limit || 0}
                    maxPaginationNumbers={state.incident.apiResponseList?.response.pagination.totalPage || 0}
                    onSelect={(nextPage) => {
                        handleNextPage(nextPage);
                    }}
                />
            )}
        </>
    );
};

export default DataPagination;
