import psutil
import time
from colorama import Fore, Style, init

init(autoreset=True)

def print_colored(text, color=Fore.WHITE, style=Style.NORMAL):
    print(f"{style}{color}{text}{Style.RESET_ALL}")

def get_system_info():
    
    cpu_percent = psutil.cpu_percent(interval=1)
    cpu_count = psutil.cpu_count()

    
    memory_info = psutil.virtual_memory()

    
    disk_info = psutil.disk_usage('/')

    
    network_info = psutil.net_io_counters()

    
    print_colored("System Information", Fore.CYAN, Style.BRIGHT)
    print_colored(f"CPU Usage: {cpu_percent}%", Fore.YELLOW)
    print_colored(f"CPU Count: {cpu_count}", Fore.YELLOW)
    print_colored(f"Memory Usage: {memory_info.percent}%", Fore.YELLOW)
    print_colored(f"Disk Usage: {disk_info.percent}%", Fore.YELLOW)
    print_colored(f"Network Sent: {network_info.bytes_sent} bytes", Fore.YELLOW)
    print_colored(f"Network Received: {network_info.bytes_recv} bytes", Fore.YELLOW)

    
    print_colored("\nAdditional Options", Fore.CYAN, Style.BRIGHT)
    print_colored(f"1. CPU Frequency: {psutil.cpu_freq().current / 1000:.2f} GHz", Fore.GREEN)
    
    battery = psutil.sensors_battery()
    battery_info = f"2. Battery Percentage: {battery.percent}%" if battery else "2. Battery Information not available"
    print_colored(battery_info, Fore.GREEN)

    processes = [process.info for process in psutil.process_iter(['pid', 'name', 'username', 'cpu_percent', 'memory_percent'])]

    print_colored("3. Top CPU-consuming Processes", Fore.CYAN, Style.BRIGHT)
    for process in sorted(processes, key=lambda x: x['cpu_percent'], reverse=True)[:5]:
        print_colored(f"   {process['name']} (PID: {process['pid']}): {process['cpu_percent']}% CPU", Fore.RED)

    print_colored("4. Top Memory-consuming Processes", Fore.CYAN, Style.BRIGHT)
    for process in sorted(processes, key=lambda x: x['memory_percent'], reverse=True)[:5]:
        print_colored(f"   {process['name']} (PID: {process['pid']}): {process['memory_percent']}% Memory", Fore.RED)

    
    cpu_uptime_minutes = (time.time() - psutil.boot_time()) / 60
    print_colored(f"5. CPU Uptime: {cpu_uptime_minutes:.2f} minutes", Fore.MAGENTA)

    
    print_colored("\nExtended Options", Fore.CYAN, Style.BRIGHT)
    print_colored("6. CPU Times (per core)", Fore.GREEN)
    for i, cpu_time in enumerate(psutil.cpu_times(percpu=True)):
        print_colored(f"   Core {i}: {cpu_time}", Fore.GREEN)

    print_colored("7. Disk Partitions", Fore.GREEN)
    for partition in psutil.disk_partitions():
        print_colored(f"   {partition.device} - {partition.mountpoint}", Fore.GREEN)

if __name__ == "__main__":
    get_system_info()
