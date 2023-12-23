#!/bin/sh
 # By DanialAasari

print_colored() {
    color=$1
    text=$2
    echo -e "\033[1;${color}m${text}\033[0m"
}


print_colored "36" "System Information"
print_colored "33" "CPU Usage: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)%"
print_colored "33" "Memory Usage: $(free -m | awk '/Mem/ {printf "%.2f%%", $3/$2 * 100}')"
print_colored "33" "Disk Usage: $(df -h / | awk 'NR==2 {print $5}')"
print_colored "33" "Network Sent: $(cat /proc/net/dev | awk '/eth0/ {print $10}') bytes"
print_colored "33" "Network Received: $(cat /proc/net/dev | awk '/eth0/ {print $2}') bytes"


print_colored "36" "\nAdditional Options"
cpu_freq=$(lscpu | awk '/MHz/ {printf "%.2f", $3/1000}')
print_colored "32" "1. CPU Frequency: ${cpu_freq} GHz"


if command -v acpi > /dev/null; then
    battery_info=$(acpi -b | awk -F'[,:%]' '{print $2, $3}')
    print_colored "32" "2. Battery: ${battery_info}"
else
    print_colored "31" "2. Battery Information not available"
fi


print_colored "36" "3. Top CPU-consuming Processes"
ps aux --sort=-%cpu | awk 'NR<=6 {print "\033[1;31m   " $11 " (PID: " $2 "): " $3 "% CPU"}'


print_colored "36" "4. Top Memory-consuming Processes"
ps aux --sort=-%mem | awk 'NR<=6 {print "\033[1;31m   " $11 " (PID: " $2 "): " $4 "% Memory"}'


uptime_minutes=$(awk '{print int($1/60)}' /proc/uptime)
print_colored "35" "5. CPU Uptime: ${uptime_minutes} minutes"


print_colored "36" "\nExtended Options"
print_colored "32" "6. CPU Times (per core)"
grep "cpu MHz" /proc/cpuinfo | awk '{print "\033[1;32m   Core " NR-1 ": " $4 " GHz"}'

print_colored "32" "7. Disk Partitions"
df -h | awk 'NR>1 {print "\033[1;32m   " $1 " - " $6}'
