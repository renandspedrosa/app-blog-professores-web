export const getNavigation = ({ isAuthenticated, isTeacher, availableNavigation, authenticatedNavigation }) => {
  return isAuthenticated
    ? [
        ...availableNavigation,
        ...authenticatedNavigation.filter(item => !(item.teacher && !isTeacher)),
      ]
    : availableNavigation;
};
