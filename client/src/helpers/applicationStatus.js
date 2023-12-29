import { StatusTexts } from "../constants/applicationStatus";

/**
 * @param {string} status
 * @returns {object}
 */
function getStatusInfo(status) {
  const statusText = StatusTexts[status] || StatusTexts.default;
  const statusClass = `status-${status}`;

  return { statusText, statusClass };
}

export default getStatusInfo;
