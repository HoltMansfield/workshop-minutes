import imgUrl from '/images/stopwatch.png'
import soundUrl from '/sounds/alarm.mp3'

export const useNotification = () => {
  const sound = new Audio(soundUrl)

  const notify = (title: string, body: string) => {
    if(window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
        if (status === 'granted') {
          const notification = new Notification(title, { 
            body: body,
            silent: false,
            icon: imgUrl
            //tag: `${selectedProject.name}-${step.name}`
          })

          notification.addEventListener("show", () => {
            sound.play()
          })

          return notification
        }
      })
    }

    return null
  }

  return {
    notify
  } as const
}
