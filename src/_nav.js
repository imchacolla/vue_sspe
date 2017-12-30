export default {
  items: [
    {
      title: true,
      name: 'Menu disponible'
    },
    {
      name: 'DASHBOARD',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'BENEFICIARIOS',
      url: '/beneficiarios',
      icon: 'icon-doc'
    },
    {
      name: 'PLANILLAS',
      url: '/components',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Registro ',
          url: '/components/planillas',
          icon: 'icon-puzzle'
        },
        {
          name: 'Generación',
          url: '/components/generar-planillas',
          icon: 'icon-puzzle'
        }
        /* {
          name: 'Social Buttons',
          url: '/components/social-buttons',
          icon: 'icon-puzzle'
        },
        {
          name: 'Cards',
          url: '/components/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Forms',
          url: '/components/forms',
          icon: 'icon-puzzle'
        },
        {
          name: 'Modals',
          url: '/components/modals',
          icon: 'icon-puzzle'
        },
        {
          name: 'Switches',
          url: '/components/switches',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tables',
          url: '/components/tables',
          icon: 'icon-puzzle'
        } */
      ]
    },
    {
      name: 'REPORTES',
      url: '/components',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Gráficos',
          url: '/components/reportes',
          icon: 'icon-pie-chart'
        },
        {
          name: 'Tablas',
          url: '/components/reportesTabla',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Icons',
      url: '/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'icon-star'
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star'
        }
      ]
    }
    /* {
      name: 'Widgets',
      url: '/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'danger',
        text: 'NEW'
      }
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-pie-chart'
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Extras'
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/pages/login',
          icon: 'icon-star'
        },
        {
          name: 'Register',
          url: '/pages/register',
          icon: 'icon-star'
        },
        {
          name: 'Error 404',
          url: '/pages/404',
          icon: 'icon-star'
        },
        {
          name: 'Error 500',
          url: '/pages/500',
          icon: 'icon-star'
        }
      ]
    } */
  ]
}
