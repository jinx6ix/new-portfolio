export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventData)
  }
}

export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "G-XXXXXXXXXX", {
      page_path: pagePath,
      page_title: pageTitle,
    })
  }
}

export const trackButtonClick = (buttonName: string, buttonLocation: string) => {
  trackEvent("button_click", {
    button_name: buttonName,
    button_location: buttonLocation,
  })
}

export const trackFormSubmission = (formName: string, formData?: Record<string, any>) => {
  trackEvent("form_submission", {
    form_name: formName,
    ...formData,
  })
}

export const trackLinkClick = (linkUrl: string, linkText: string) => {
  trackEvent("link_click", {
    link_url: linkUrl,
    link_text: linkText,
  })
}

export const trackServiceView = (serviceName: string, serviceId: string) => {
  trackEvent("service_viewed", {
    service_name: serviceName,
    service_id: serviceId,
  })
}

export const trackProjectView = (projectName: string, projectId: string) => {
  trackEvent("project_viewed", {
    project_name: projectName,
    project_id: projectId,
  })
}

export const trackBlogRead = (blogTitle: string, blogSlug: string, readTime: number) => {
  trackEvent("blog_read", {
    blog_title: blogTitle,
    blog_slug: blogSlug,
    read_time: readTime,
  })
}

export const trackContactAttempt = (contactMethod: string) => {
  trackEvent("contact_attempt", {
    contact_method: contactMethod,
  })
}

export const trackBookingStart = (serviceType: string) => {
  trackEvent("booking_started", {
    service_type: serviceType,
  })
}

export const trackBookingComplete = (serviceType: string, price: number) => {
  trackEvent("booking_completed", {
    service_type: serviceType,
    price: price,
  })
}

export const trackScrollDepth = (scrollPercentage: number) => {
  trackEvent("scroll_depth", {
    scroll_percentage: scrollPercentage,
  })
}

export const trackTimeOnPage = (pageName: string, timeSpent: number) => {
  trackEvent("time_on_page", {
    page_name: pageName,
    time_spent_seconds: timeSpent,
  })
}
