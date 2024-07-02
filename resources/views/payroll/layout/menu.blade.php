<div class="nav-container">
    <nav id="main-menu-navigation" class="navigation-main">
        <div class="nav-item {{ request()->routeIs(['dashboard']) ? 'active' : '' }}">
            <a href="{{ route('dashboard') }}"><i class="ik ik-bar-chart-2"></i><span>Dashboard</span></a>
        </div>

        <div class="nav-lavel">Manage Employees</div>
        <div class="nav-item has-sub {{ request()->routeIs('employee.*') ? 'active open' : '' }} {{ request()->routeIs('overtime.*') ? 'active open' : '' }} {{ request()->routeIs('cashadvance.*') ? 'active open' : '' }}">
            <a href="javascript:void(0)"><i class="ik users ik-users"></i><span>Employees</span>
                @if($counts['employees'] != 0)
                <span title="Total Records" class="badge badge-light text-dark">
                    {{ $counts['employees'] }}
                </span>
                @endif
            </a>
            <div class="submenu-content">
                <a href="{{ route('employee.create') }}" class="menu-item {{ request()->routeIs('employee.create') ? 'active' : '' }}"><i class="ik ik-user-plus"></i>Add New Employee</a>
                <a href="{{ route('employee.index') }}" class="menu-item {{ request()->routeIs('employee.index') ? 'active' : '' }}"><i class="ik file-text ik-file-text"></i>List Of Employees</a>
                <a href="{{ route('overtime.index') }}" class="menu-item {{ request()->routeIs('overtime.*') ? 'active' : '' }}"><i class="ik watch ik-watch"></i>Overtime</a>
                <a href="{{ route('cashadvance.index') }}" class="menu-item {{ request()->routeIs('cashadvance.index') ? 'active' : '' }}"><i class="ik at-sign ik-at-sign"></i>Cash Advance</a>
            </div>
        </div>

        <div class="nav-item has-sub {{ request()->routeIs('attendance.*') ? 'active open' : '' }}">
            <a href="javascript:void(0)"><i class="ik ik-check-circle"></i><span>Attendance</span>
            </a>
            <div class="submenu-content">
                <a href="{{ route('attendance.create') }}" class="menu-item {{ request()->routeIs('attendance.create') ? 'active' : '' }}"><i class="ik ik-plus-circle"></i>Add New Attendance</a>
                <a href="{{ route('attendance.index') }}" class="menu-item {{ request()->routeIs('attendance.index') ? 'active' : '' }}"><i class="ik file-text ik-file-text"></i>List Of Attendance</a>
            </div>
        </div>

        <div class="nav-item {{ request()->routeIs(['payroll.*']) ? 'active' : '' }}">
            <a href="{{ route('payroll.index') }}"><i class="ik ik-dollar-sign"></i><span>Payroll</span></a>
        </div>

        <div class="nav-lavel">Manage Site</div>

        <div class="nav-item has-sub {{ request()->routeIs('position.*') ? 'active open' : '' }}">
            <a href="javascript:void(0)"><i class="ik ik-briefcase"></i><span>Positions</span>
                @if($counts['positions'] != 0)
                <span title="Total Records" class="badge badge-light text-dark">
                    {{ $counts['positions'] }}
                </span>
                @endif
            </a>
            <div class="submenu-content">
                <a href="{{ route('position.create') }}" class="menu-item {{ request()->routeIs('position.create') ? 'active' : '' }}"><i class="ik ik-plus-circle"></i>Add New Position</a>
                <a href="{{ route('position.index') }}" class="menu-item {{ request()->routeIs('position.index') ? 'active' : '' }}"><i class="ik file-text ik-file-text"></i>List Of Position</a>
            </div>
        </div>

        <div class="nav-item has-sub {{ request()->routeIs('deduction.*') ? 'active open' : '' }}">
            <a href="javascript:void(0)"><i class="ik file-minus ik-file-minus"></i><span>Deductions</span>
                @if($counts['deductions'] != 0)
                <span title="Total Records" class="badge badge-light text-dark">
                    {{ $counts['deductions'] }}
                </span>
                @endif
            </a>
            <div class="submenu-content">
                <a href="{{ route('deduction.create') }}" class="menu-item {{ request()->routeIs('deduction.create') ? 'active' : '' }}"><i class="ik ik-plus-circle"></i>Add New Deduction</a>
                <a href="{{ route('deduction.index') }}" class="menu-item {{ request()->routeIs('deduction.index') ? 'active' : '' }}"><i class="ik file-text ik-file-text"></i>List Of Deductions</a>
            </div>
        </div>

        <div class="nav-item has-sub {{ request()->routeIs('schedule.*') ? 'active open' : '' }}">
            <a href="javascript:void(0)"><i class="ik clock ik-clock"></i><span>Schedules</span>
                @if($counts['schedules'] != 0)
                <span title="Total Records" class="badge badge-light text-dark">
                    {{ $counts['schedules'] }}
                </span>
                @endif
            </a>
            <div class="submenu-content">
                <a href="{{ route('schedule.create') }}" class="menu-item {{ request()->routeIs('schedule.create') ? 'active' : '' }}"><i class="ik ik-plus-circle"></i>Add New Schedule</a>
                <a href="{{ route('schedule.index') }}" class="menu-item {{ request()->routeIs('schedule.index') ? 'active' : '' }}"><i class="ik file-text ik-file-text"></i>List Of Schedules</a>
            </div>
        </div>

        <div class="nav-lavel">Site Settings</div>
        <div class="nav-item {{ request()->routeIs('profile.*') ? 'active' : '' }}">
            <a href="{{ route('profile.index') }}"><i class="ik user ik-user"></i><span>My Profile</span></a>
        </div>
<!--
        <div class="nav-item">
            <a href="#" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                <i class="ik log-out ik-log-out"></i><span>Logout</span>
            </a>
            <form id="logout-form" method="POST" style="display: none;">
                @csrf
            </form>
        </div> -->

    </nav>
</div>
