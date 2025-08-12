import { defineStore } from 'pinia'

export const useWireStore = defineStore('wires', {
  state: () => ({
"wireDatabase": [
      {"section": 0.22, "current1": 0.038, "current2": 0.076, "current3": 0.114, "current4": 0.152, "current5": 0.190, "current6": 0.228},
      {"section": 0.23, "current1": 0.042, "current2": 0.083, "current3": 0.125, "current4": 0.166, "current5": 0.208, "current6": 0.249},
      {"section": 0.25, "current1": 0.049, "current2": 0.098, "current3": 0.147, "current4": 0.196, "current5": 0.245, "current6": 0.294},
      {"section": 0.28, "current1": 0.062, "current2": 0.123, "current3": 0.185, "current4": 0.246, "current5": 0.308, "current6": 0.369},
      {"section": 0.315, "current1": 0.078, "current2": 0.156, "current3": 0.234, "current4": 0.312, "current5": 0.389, "current6": 0.467},
      {"section": 0.335, "current1": 0.088, "current2": 0.176, "current3": 0.264, "current4": 0.352, "current5": 0.440, "current6": 0.529},
      {"section": 0.355, "current1": 0.099, "current2": 0.198, "current3": 0.297, "current4": 0.396, "current5": 0.495, "current6": 0.594},
      {"section": 0.40, "current1": 0.126, "current2": 0.251, "current3": 0.377, "current4": 0.502, "current5": 0.628, "current6": 0.754},
      {"section": 0.45, "current1": 0.159, "current2": 0.318, "current3": 0.477, "current4": 0.636, "current5": 0.795, "current6": 0.954},
      {"section": 0.50, "current1": 0.196, "current2": 0.393, "current3": 0.589, "current4": 0.785, "current5": 0.981, "current6": 1.178},
      {"section": 0.51, "current1": 0.204, "current2": 0.408, "current3": 0.613, "current4": 0.817, "current5": 1.021, "current6": 1.225},
      {"section": 0.53, "current1": 0.221, "current2": 0.441, "current3": 0.662, "current4": 0.882, "current5": 1.103, "current6": 1.323},
      {"section": 0.56, "current1": 0.246, "current2": 0.492, "current3": 0.739, "current4": 0.985, "current5": 1.231, "current6": 1.477},
      {"section": 0.60, "current1": 0.283, "current2": 0.565, "current3": 0.848, "current4": 1.130, "current5": 1.413, "current6": 1.696},
      {"section": 0.63, "current1": 0.312, "current2": 0.623, "current3": 0.935, "current4": 1.246, "current5": 1.558, "current6": 1.869},
      {"section": 0.65, "current1": 0.332, "current2": 0.663, "current3": 0.995, "current4": 1.327, "current5": 1.658, "current6": 1.990},
      {"section": 0.67, "current1": 0.352, "current2": 0.705, "current3": 1.057, "current4": 1.410, "current5": 1.762, "current6": 2.114},
      {"section": 0.69, "current1": 0.374, "current2": 0.747, "current3": 1.121, "current4": 1.495, "current5": 1.869, "current6": 2.242},
      {"section": 0.71, "current1": 0.396, "current2": 0.791, "current3": 1.187, "current4": 1.583, "current5": 1.979, "current6": 2.374},
      {"section": 0.72, "current1": 0.407, "current2": 0.814, "current3": 1.221, "current4": 1.628, "current5": 2.035, "current6": 2.442},
      {"section": 0.74, "current1": 0.430, "current2": 0.860, "current3": 1.290, "current4": 1.719, "current5": 2.149, "current6": 2.579},
      {"section": 0.75, "current1": 0.442, "current2": 0.883, "current3": 1.325, "current4": 1.766, "current5": 2.208, "current6": 2.649},
      {"section": 0.77, "current1": 0.465, "current2": 0.931, "current3": 1.396, "current4": 1.862, "current5": 2.327, "current6": 2.793},
      {"section": 0.80, "current1": 0.502, "current2": 1.005, "current3": 1.507, "current4": 2.010, "current5": 2.512, "current6": 3.014},
      {"section": 0.82, "current1": 0.528, "current2": 1.056, "current3": 1.584, "current4": 2.111, "current5": 2.639, "current6": 3.167},
      {"section": 0.85, "current1": 0.567, "current2": 1.134, "current3": 1.701, "current4": 2.269, "current5": 2.836, "current6": 3.403},
      {"section": 0.90, "current1": 0.636, "current2": 1.272, "current3": 1.908, "current4": 2.543, "current5": 3.179, "current6": 3.815},
      {"section": 0.93, "current1": 0.679, "current2": 1.358, "current3": 2.037, "current4": 2.716, "current5": 3.395, "current6": 4.074},
      {"section": 0.95, "current1": 0.708, "current2": 1.417, "current3": 2.125, "current4": 2.834, "current5": 3.542, "current6": 4.251},
      {"section": 1.00, "current1": 0.785, "current2": 1.570, "current3": 2.355, "current4": 3.140, "current5": 3.925, "current6": 4.710},
      {"section": 1.04, "current1": 0.849, "current2": 1.698, "current3": 2.547, "current4": 3.396, "current5": 4.245, "current6": 5.094},
      {"section": 1.06, "current1": 0.882, "current2": 1.764, "current3": 2.646, "current4": 3.528, "current5": 4.410, "current6": 5.292},
      {"section": 1.08, "current1": 0.916, "current2": 1.831, "current3": 2.747, "current4": 3.662, "current5": 4.578, "current6": 5.494},
      {"section": 1.12, "current1": 0.985, "current2": 1.969, "current3": 2.954, "current4": 3.939, "current5": 4.924, "current6": 5.908},
      {"section": 1.16, "current1": 1.059, "current2": 2.113, "current3": 3.169, "current4": 4.225, "current5": 5.281, "current6": 6.338},
      {"section": 1.18, "current1": 1.093, "current2": 2.186, "current3": 3.279, "current4": 4.372, "current5": 5.465, "current6": 6.558},
      {"section": 1.25, "current1": 1.227, "current2": 2.453, "current3": 3.680, "current4": 4.906, "current5": 6.133, "current6": 7.359},
      {"section": 1.30, "current1": 1.327, "current2": 2.653, "current3": 3.980, "current4": 5.307, "current5": 6.633, "current6": 7.960},
      {"section": 1.32, "current1": 1.363, "current2": 2.726, "current3": 4.103, "current4": 5.471, "current5": 6.839, "current6": 8.207},
      {"section": 1.35, "current1": 1.431, "current2": 2.861, "current3": 4.292, "current4": 5.723, "current5": 7.153, "current6": 8.584},
      {"section": 1.40, "current1": 1.539, "current2": 3.077, "current3": 4.616, "current4": 6.154, "current5": 7.693, "current6": 9.232},
      {"section": 1.45, "current1": 1.650, "current2": 3.301, "current3": 4.951, "current4": 6.602, "current5": 8.252, "current6": 9.903},
      {"section": 1.50, "current1": 1.766, "current2": 3.533, "current3": 5.299, "current4": 7.066, "current5": 8.831, "current6": 10.598},
      {"section": 1.56, "current1": 1.910, "current2": 3.821, "current3": 5.731, "current4": 7.642, "current5": 9.552, "current6": 11.462},
      {"section": 1.60, "current1": 2.010, "current2": 4.019, "current3": 6.029, "current4": 8.038, "current5": 10.048, "current6": 12.058},
      {"section": 1.70, "current1": 2.269, "current2": 4.537, "current3": 6.806, "current4": 9.075, "current5": 11.343, "current6": 13.612},
      {"section": 1.80, "current1": 2.543, "current2": 5.087, "current3": 7.630, "current4": 10.174, "current5": 12.717, "current6": 15.261}
    ]
  }),
  getters: {
    // Нормализованный список для расчётов: ток одного провода
    normalizedWires: (state) => state.wireDatabase.map(w => ({
      section: w.section,
      current: Number(w.current1),
    })),
    // Развёрнутая строка с рассчитанным сопротивлением
    expandedRows: (state) => state.wireDatabase.map(w => ({
      ...w,
      resistance: Number((1.75 / w.section).toFixed(2)),
    })),
    // Валидация: проверка соответствия колонок кратности current1 (округление до 0.001)
    validation: (state) => {
      const issues = []
      for (const w of state.wireDatabase) {
        for (let m = 1; m <= 6; m += 1) {
          const key = `current${m}`
          const val = Number(w[key])
          const expected = Number((w.current1 * m).toFixed(3))
          const diff = Math.abs(val - expected)
          if (!Number.isFinite(val) || diff > 0.001) {
            issues.push({ section: w.section, column: key, value: val, expected, diff: Number(diff.toFixed(3)) })
          }
        }
      }
      // Дополнительные проверки монотонности
      const sections = state.wireDatabase.map(w => w.section)
      for (let i = 1; i < sections.length; i += 1) {
        if (!(sections[i] > sections[i - 1])) {
          issues.push({ type: 'order', at: i, prev: sections[i - 1], curr: sections[i] })
        }
      }
      return {
        issues,
        ok: issues.length === 0,
      }
    },
  }
})


