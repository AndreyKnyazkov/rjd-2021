document.addEventListener("DOMContentLoaded", function (event) {
  function trainInit() {
    gsap.registerPlugin(MotionPathPlugin);

    const mapCurrentPath = document.querySelector('.map-path-1')
    const mapCurrentPath2 = document.querySelector('.map-path-2')

    const mapCurrentPathLength = mapCurrentPath.getTotalLength()
    const mapCurrentPathLength2 = mapCurrentPath2.getTotalLength()

    const trainSpeed = 100;

    const trainJs = '.train_js'

    // train initial position
    function setTrainStartPosition() {

      gsap.to(trainJs, {
        motionPath: {
          path: mapCurrentPath,
          align: mapCurrentPath,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: 1,
        },
        ease: 'none',
        duration: mapCurrentPathLength / trainSpeed,
        onComplete() {
          console.log('completed')
          callTrain({
            item: mapCurrentPath2,
            pathLength: mapCurrentPathLength2
          })
        },
      })
    }
    // setTimeout(() => {
    //   setTrainStartPosition()

    //   clearTimeout()
    // }, 5000);

    function callTrain({ item, pathLength, point }) {

      gsap.to(trainJs, {
        motionPath: {
          path: item,
          align: item,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: 1,
        },
        duration: pathLength / trainSpeed,
        ease: "none",
        yoyo: true,
        onComplete() {
          callTrain({
            item: mapCurrentPath2,
            pathLength: mapCurrentPathLength2
          })
        }
      })
    }
  }
  trainInit()

  function performAnimation({hoverTarget, animationLength, animateAlso} = {}) {
    // recognize if animation is still active
    if (hoverTarget.dataset.active === "true") {
      return
    }
    
    // set interval
    let animationProcessing
    // state for animation
    let animationState = false

    function setRemoveAnimation({selector, animateAlso = []} = {}) {
      // set interval for processing animation
      animationProcessing = setInterval(() => {
        // if animation is ended then we exit
        if (animationState === false) {
          canBeActive = true
          removeAnimation()
          animationProcessing = clearInterval(animationProcessing)
        }
        
      }, animationLength)

      Array.from(selector.children).forEach((item) => {
        item.classList.add(`${item.classList[0]}_animatejs`)
      })
      
      animateAlso.forEach((item) => {
        
        document.querySelector(`.${item}`).classList.add(`${item}_animatejs`)
      })
      
      function removeAnimation() {
        hoverTarget.setAttribute("data-active", "false")

        Array.from(selector.children).forEach((item) => {
          item.classList.remove(`${item.classList[0]}_animatejs`)
        })
  
        animateAlso.forEach((item) => {
          document.querySelector(`.${item}`).classList.remove(`${item}_animatejs`)
        }) 
      }
    }

    // set target we animate elements on
    hoverTarget.addEventListener('mouseenter', e => {
      if (hoverTarget.dataset.active === "true") {
        return
      }
      // as we've hovered we set state and animation to true
      animationState = true
      hoverTarget.setAttribute("data-active", "true")

      setRemoveAnimation({
        action: 'set',
        selector: hoverTarget,
        animateAlso: animateAlso
      })
    })

    hoverTarget.addEventListener('mouseleave', e => { 
      // if data-active is true and animation state is false then do nothing
      if (hoverTarget.dataset.active === "true" && animationState === false) {
        return
      }

      animationState = false
    })
  }

  performAnimation({
    hoverTarget: document.querySelector('.train-atom'),
    animationLength: 3600,
    animateAlso: ['train-atom']
  })

  performAnimation({
    hoverTarget: document.querySelector('.train-car'),
    animationLength: 2600,
    animateAlso: []
  })

  performAnimation({
    hoverTarget: document.querySelector('.raleway-station__img'),
    animationLength: 4000,
    animateAlso: ['raleway-station__train']
  })

  performAnimation({
    hoverTarget: document.querySelector('.capsule-car'),
    animationLength: 5000,
    animateAlso: ['capsule-car__curtain__1', 'capsule-car__curtain__2', 'capsule-car__curtain__3']
  })

  performAnimation({
    hoverTarget: document.querySelector('.train-box'),
    animationLength: 3600,
    animateAlso: []
  })

});