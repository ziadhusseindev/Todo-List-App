# React Todo Application

A modern, responsive Todo list application built with React.js and Tailwind CSS, featuring a beautiful UI with animations and dark mode support.



## Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing in any environment
- **Local Storage**: Your todos persist between sessions
- **Animations**: Smooth animations enhance the user experience
- **Todo Management**:
  - Add new todos
  - Mark todos as complete/incomplete
  - Edit existing todos
  - Delete todos
  - Filter todos (All, Active, Completed)
  - Clear all completed todos
- **Loading States**: Visual feedback during loading operations
- **Keyboard Accessibility**: Fully usable with keyboard navigation

## Technologies Used

- **React.js**: Frontend library for building user interfaces
- **Next.js**: React framework for production
- **Tailwind CSS**: Utility-first CSS framework for styling
- **LocalStorage API**: For persisting todos between sessions


## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react-todo-app.git
   cd react-todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
/app
  /components
    - Todo.jsx         # Main Todo component with core functionality
    - TodoPage.jsx     # Page wrapper with dark mode toggle
  - page.js            # Next.js page component
/public
  - screenshot.png     # App screenshot for README
- README.md            # Project documentation
- package.json         # Project dependencies and scripts
- tailwind.config.mjs  # Tailwind CSS configuration
- tsconfig.json        # TypeScript configuration
```

## Usage

- **Adding a Todo**: Type in the input field and press Enter or click the "Add" button
- **Completing a Todo**: Click the checkbox next to a todo
- **Editing a Todo**: Click the pencil icon, make changes, then click the checkmark or press Enter
- **Deleting a Todo**: Click the trash icon
- **Filtering Todos**: Use the "All", "Active", and "Completed" buttons
- **Clearing Completed Todos**: Click the "Clear completed" button
- **Toggling Dark Mode**: Click the sun/moon icon in the header

## Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the appearance by modifying the `tailwind.config.mjs` file.

### Animations

Animations are implemented using Tailwind CSS classes. You can adjust the animation durations and behaviors in the component files.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Created by [Ziad Hussein]
- Built with ❤️ using React and Tailwind CSS

---


