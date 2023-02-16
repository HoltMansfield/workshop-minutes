import imgUrl from '/public/images/stopwatch.png'

export const useNotification = () => {
  const notify = (title: string, body: string) => {
    if(window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
        if (status === 'granted') {
          const n = new Notification(title, { 
            body: body,
            silent: false,
            icon: imgUrl // optional
            //tag: `${selectedProject.name}-${step.name}`
          })
          return n
        }
      })
    }

    return null
  }

  return {
    notify
  } as const
}
