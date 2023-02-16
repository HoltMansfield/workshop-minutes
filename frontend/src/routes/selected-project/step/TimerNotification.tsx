//https://davidwalsh.name/notifications-api
import { useEffect } from "react"
import { Step } from "src/DMS/collections/project"
import imgUrl from '/public/images/stopwatch.png'

interface TimerNotificationProps {
  step: Step
  setShowNotification: (newState: boolean) => void
}

export const TimerNotification = ({ step, setShowNotification }: TimerNotificationProps) => {
  useEffect(() => {
    var n = new Notification('Timer done', { 
      body: `Timer up for: ${step.name}`,
      silent: false,
      icon: imgUrl // optional
    })
    setShowNotification(false)
  })

  // useEffect(() => {
  //   if(window.Notification && Notification.permission !== "denied") {
  //     Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
  //       var n = new Notification('Timer done', { 
  //         body: `Timer up for: ${step.name}`,
  //         silent: false,
  //         icon: imgUrl // optional
  //       })
  //     })
  //   }
  //   //setShowNotification(false)
  // }, [])

  // useEffect(() => {
  //   if(window.Notification && Notification.permission !== "denied") {
  //     Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
  //       if (status === 'granted') {
  //         var n = new Notification('Timer done', { 
  //           body: `Timer up for: ${step.name}`,
  //           silent: false,
  //           icon: imgUrl // optional
  //         })
  //       }
  //     })
  //   }

  //   setTimeout(() => {
  //     setShowNotification(false)
  //   }, 300)
  // })

  return null
}
