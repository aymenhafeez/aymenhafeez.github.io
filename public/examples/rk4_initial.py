import numba
import numpy as np


@numba.njit(nogil=True)
def lorenz(x_var, t, params):
    x, y, z = x_var
    a, b, c = params

    dx_dt = a * (y - x)
    dy_dt = x * (b - z) - y
    dz_dt = x * y - c * z

    return np.array([dx_dt, dy_dt, dz_dt])


@numba.njit(nogil=True)
def rk4_step(state, dt, params, eq):
    k1 = eq(state, 0.0, params)
    k2 = eq(state + 0.5 * dt * k1, 0.0, params)
    k3 = eq(state + 0.5 * dt * k2, 0.0, params)
    k4 = eq(state + dt * k3, 0.0, params)

    return state + (dt / 6.0) * (k1 + 2 * k2 + 2 * k3 + k4)


@numba.njit(nogil=True)
def solve_rk4(eq, y0, t_min, t_max, n, params):
    state = y0.copy()
    dt = (t_max - t_min) / n
    traj = np.empty((n, y0.shape[0]), dtype=np.float64)

    for i in range(n):
        state = rk4_step(state, dt, params, eq)
        traj[i] = state

    return traj
