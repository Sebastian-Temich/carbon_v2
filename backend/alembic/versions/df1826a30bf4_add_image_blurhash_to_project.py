"""add image blurhash to project

Revision ID: df1826a30bf4
Revises: 09af7e2c34e1
Create Date: 2023-02-15 21:49:45.538671

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = 'df1826a30bf4'
down_revision = '09af7e2c34e1'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('projects', sa.Column('image_blurhash', sa.Text(), nullable=True), schema='carbon')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('projects', 'image_blurhash', schema='carbon')
    # ### end Alembic commands ###
