from uuid import UUID

from domain.entities.sustainable_development_goal import SustainableDevelopmentGoal
from infrastructure.database.db import db


def seed_sustainable_development_goals():
    goal_names = [
        'No Poverty',
        'Zero Hunger',
        'Good Health and Well-Being',
        'Quality Education',
        'Gender Equality',
        'Clean Water and Sanitation',
        'Affordable and Clean Energy',
        'Decent Work and Economic Growth',
        'Industry, Innovation and Infrastructure',
        'Reduced Inequalities',
        'Sustainable Cities and Communities',
        'Responsible Consumption and Production',
        'Climate Action',
        'Life Below Water',
        'Life on Land',
        'Peace, Justice and Strong Institutions',
        'Partnerships for the Goals'
    ]
    for index, goal_name in enumerate(iterable=goal_names, start=1):
        goal = SustainableDevelopmentGoal(id=UUID(int=index), name=goal_name, image_uri=f'sdg-{index:{0}{2}}.png')
        db.session.merge(goal)

    db.session.commit()
