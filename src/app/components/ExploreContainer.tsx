import './ExploreContainer.css';

type Props = {};

export default function ExploreContainer({}: Props) {
    return (
        <div id="container">
            <strong>Ready to create an app? NO</strong>
            <p>
                Start with Ionic{' '}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://ionicframework.com/docs/components"
                >
                    UI Components
                </a>
            </p>
        </div>
    );
}
