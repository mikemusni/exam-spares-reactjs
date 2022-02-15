import React from "react";
import Filter from "./list/Filter";
import DataTable from "./list/DataTable";
import DataPagination from "./list/DataPagination";
import AddIncident from "./modal/AddIncident";
import RemoveIncident from "./modal/RemoveIncident";

const Incident: React.FC = () => {
    return (
        <>
            <Filter />
            <DataTable />
            <DataPagination />
            <AddIncident />
            <RemoveIncident />
        </>
    );
};

export default Incident;
