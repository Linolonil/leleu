import confetti from "canvas-confetti"

export function launchConfetti() {
  // First burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6, x: 0.5 },
    colors: ["#FF9800", "#FFC107", "#FFEB3B", "#FFFFFF"],
  })

  // Side bursts with slight delay
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#FF9800", "#FFC107", "#FFEB3B", "#FFFFFF"],
    })

    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#FF9800", "#FFC107", "#FFEB3B", "#FFFFFF"],
    })
  }, 150)
}

// Função melhorada para efeitos especiais de jutsu
export function handleJutsuActivation(type: string) {
  switch (type) {
    case "rasengan":
      // Spiral confetti
      confetti({
        particleCount: 80,
        angle: 0,
        spread: 360,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#1E90FF", "#00BFFF", "#87CEFA"],
        ticks: 300,
        shapes: ["circle"],
        gravity: 0.1,
        scalar: 0.8,
        drift: 0,
      })
      break
    case "kage":
      // Multiple bursts for shadow clones
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 30,
            angle: 130,
            spread: 50,
            origin: { x: 0.1 + i * 0.4, y: 0.8 },
            colors: ["#FFA500", "#FF8C00", "#FF4500"],
          })
        }, i * 300)
      }
      break
    case "chidori":
      // Lightning effect
      confetti({
        particleCount: 60,
        angle: 90,
        spread: 30,
        origin: { x: 0.5, y: 0.3 },
        colors: ["#FFFFFF", "#F0FFFF", "#E0FFFF"],
        shapes: ["square"],
        ticks: 200,
        gravity: 0.7,
        scalar: 1.2,
      })
      break
  }
}
