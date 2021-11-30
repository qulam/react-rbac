import apiRoutes from "src/common/api/routes";
import {instanceSecureAxios} from "src/common/config/api";

export const fetchReportARFlow = () =>
    instanceSecureAxios.get(apiRoutes.FETCH_REPORTS_AR()).then(res => res.data);

export const fetchReportARByLocationFlow = () =>
    instanceSecureAxios.get(apiRoutes.FETCH_REPORTS_AR_BY_LOCATION()).then(res => res.data);

export const fetchReportARByPayerGroupFlow = () =>
    instanceSecureAxios.get(apiRoutes.FETCH_REPORTS_AR_BY_PAYER_GROUP()).then(res => res.data);

export const fetchReportARByBalance = () =>
    instanceSecureAxios.get(apiRoutes.FETCH_REPORTS_AR_BY_BALANCE()).then(res => res.data);

export const fetchReportARByCount = () =>
    instanceSecureAxios.get(apiRoutes.FETCH_REPORTS_AR_BY_COUNT()).then(res => res.data);

export const fetchReportARByProfiles = () =>
    instanceSecureAxios.get(apiRoutes.FETCH_REPORTS_AR_BY_PROFILES()).then(res => res.data);