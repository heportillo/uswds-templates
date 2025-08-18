#!/bin/bash

# Kill processes on the ports used by the dev servers
PORTS=(3000 3001 3002 4000 4001)

for PORT in "${PORTS[@]}"; do
  PID=$(lsof -ti:$PORT 2>/dev/null)
  if [ ! -z "$PID" ]; then
    echo "Killing process on port $PORT (PID: $PID)"
    kill -9 $PID 2>/dev/null
  fi
done

echo "Ports cleared, starting dev servers..."