# #!/bin/bash

# # Get Server IP
# SERVER_IP=$(hostname -I | awk '{print $1}')

# # Get Hostname
# HOSTNAME=$(hostname)

# # Get CPU Idle percentage
# CPU_IDLE=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1"%"}')

# # Get Memory Usage
# MEMORY_USAGE=$(free -m | awk 'NR==2{printf "%.2f", $3*100/$2 }')

# # Get Swap Usage
# SWAP_USAGE=$(free -m | awk 'NR==3{printf "%.2f", $3*100/$2 }')

# # Ensure all necessary data is present
# if [ -z "$SERVER_IP" ] || [ -z "$HOSTNAME" ] || [ -z "$CPU_IDLE" ] || [ -z "$MEMORY_USAGE" ] || [ -z "$SWAP_USAGE" ]; then
#     echo "Error: Failed to gather server data."
#     exit 1
# fi

# # Format data into JSON
# JSON_DATA=$(cat <<EOF
# {
#   "Server_IP": "$SERVER_IP",
#   "HostName": "$HOSTNAME",
#   "CPU_IDLE": "$CPU_IDLE",
#   "Memory_Usage": "$MEMORY_USAGE%",
#   "Swap_Usage": "$SWAP_USAGE%"
# }
# EOF
# )

# # Send data via cURL to your Spring Boot Application's REST API
# curl -X POST -H "Content-Type: application/json" \
#   -d "$JSON_DATA" \
#   http://localhost:8080/api/monitoring





#!/bin/bash

# Get Server IP
SERVER_IP=$(hostname -I | awk '{print $1}')

# Get Hostname
HOSTNAME=$(hostname)

# Get CPU Idle percentage
CPU_IDLE=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1"%"}')

# Get Memory Usage
MEMORY_USAGE=$(free -m | awk 'NR==2{printf "%.2f", $3*100/$2 }')

# Get Swap Usage
SWAP_USAGE=$(free -m | awk 'NR==3{printf "%.2f", $3*100/$2 }')

# Ensure all necessary data is present
if [ -z "$SERVER_IP" ] || [ -z "$HOSTNAME" ] || [ -z "$CPU_IDLE" ] || [ -z "$MEMORY_USAGE" ] || [ -z "$SWAP_USAGE" ]; then
    echo "Error: Failed to gather server data."
    exit 1
fi

# Format data into JSON
JSON_DATA=$(cat <<EOF
{
  "Server_IP": "$SERVER_IP",
  "HostName": "$HOSTNAME",
  "CPU_IDLE": "$CPU_IDLE",
  "Memory_Usage": "$MEMORY_USAGE%",
  "Swap_Usage": "$SWAP_USAGE%"
}
EOF
)

# Print the JSON output
echo "$JSON_DATA"
