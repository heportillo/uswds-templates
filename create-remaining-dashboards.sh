#!/bin/bash

# Script to create remaining dashboard templates

BASE_PATH="/home/hectorwsl/repos/uswds-templates/templates/plain/templates/dashboards"

# Create directories for remaining dashboards
declare -a dashboards=(
    "education-dashboard"
    "immigration-status"
    "veterans-affairs"
    "social-security"
    "business-owner"
    "grant-management"
    "contractor-dashboard"
    "census-data"
    "economic-indicators"
    "environmental-monitoring"
    "public-health"
    "crime-statistics"
    "transportation-analytics"
    "energy-consumption"
    "agricultural-dashboard"
    "tourism-analytics"
    "research-metrics"
    "emergency-response"
    "project-management"
    "procurement-dashboard"
    "facility-management"
    "call-center"
    "election-monitoring"
    "border-control"
    "disaster-recovery"
    "quality-assurance"
    "training-management"
)

for dashboard in "${dashboards[@]}"
do
    mkdir -p "$BASE_PATH/$dashboard"
    echo "Created directory: $dashboard"
done

echo "All dashboard directories created successfully!"