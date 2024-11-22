import { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import apiService from "components/ApiService/apiService";
import team2 from "assets/images/team-2.jpg";
import PropTypes from "prop-types";

function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

Author.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

function AuthorsTable() {
  const { data, loading, error } = apiService();

  if (error) {
    return (
      <SoftBox>
        <SoftTypography color="error">Error: {error}</SoftTypography>
      </SoftBox>
    );
  }

  const authorsTableData = {
    columns: [
      { name: "author", align: "left" },
      { name: "phone", align: "left" },
      { name: "city", align: "center" },
      { name: "campaing", align: "center" },
    ],
    rows: loading
      ? []
      : data.map((item, index) => ({
          author: <Author image={team2} name={item.name} email={item.email} />,
          phone: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {item.phone}
            </SoftTypography>
          ),
          city: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {item.city}
            </SoftTypography>
          ),
          campaing: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {item.campaing}
            </SoftTypography>
          ),
        })),
  };

  return (
    <SoftBox>
      <SoftBox component="table" width="100%" borderCollapse="collapse" mt={2} boxShadow={3}>
        <thead>
          <SoftBox component="tr">
            {authorsTableData.columns.map((column, index) => (
              <SoftBox key={index} component="th" textAlign={column.align} padding={1}>
                <SoftTypography variant="button" fontWeight="medium">
                  {column.name}
                </SoftTypography>
              </SoftBox>
            ))}
          </SoftBox>
        </thead>
        <tbody>
          {authorsTableData.rows.map((row, index) => (
            <SoftBox component="tr" key={index}>
              {authorsTableData.columns.map((column, colIndex) => (
                <SoftBox key={colIndex} component="td" textAlign={column.align} padding={1}>
                  {row[column.name]}
                </SoftBox>
              ))}
            </SoftBox>
          ))}
        </tbody>
      </SoftBox>
    </SoftBox>
  );
}

export default AuthorsTable;
