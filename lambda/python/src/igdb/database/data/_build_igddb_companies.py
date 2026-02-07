from typing import Any


def build_igdb_companies(candidate_list: list[dict[str, Any]]):
    companies = set()

    for candidate in candidate_list:
        for company in candidate.get("developers", []) + candidate.get("publishers", []):
            company_id = company.get("id")
            company_name = company.get("name")
            country_code = company.get("country", None)
            if not isinstance(country_code, int):
                country_code = None
            if company_id is None or company_name is None:
                continue
            companies.add((company_id, company_name, country_code))

    return list(companies)
